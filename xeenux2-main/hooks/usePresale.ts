import { useState, useCallback } from 'react';
import { ethers, formatUnits } from 'ethers';
import { ADDRESSES } from '@/lib/contracts/addresses';
import { PRESALE_ABI, ERC20_ABI } from '@/lib/contracts/abis';
import { getWeb3Provider } from '@/lib/web3/provider';
import { toast } from '@/components/ui/use-toast';
import { UCCInfo, UserUCCInfo } from '@/lib/types';

export enum PurchaseStatus {
  IDLE = 'IDLE',
  APPROVING = 'APPROVING',
  APPROVED = 'APPROVED',
  PURCHASING = 'PURCHASING',
  CONFIRMED = 'CONFIRMED',
  ERROR = 'ERROR',
}

export function usePresale() {
  const [status, setStatus] = useState<PurchaseStatus>(PurchaseStatus.IDLE);
  const [userAddress, setUserAddress] = useState<string>('');
  const [curPage, setCurPage] = useState<number>(1);
  const [totalTokens, setTotalToken] = useState<number>(0);
  const [uccInfo, setUCCInfo] = useState<UCCInfo>({
    totalInvestmentsUSDT: 0,
    totalInvestmentsBNB: 0,
    totalUsers: 0,
    priceUSDT: 0,
    priceBNB: 0,
    totalTokensToBEDistributed: 0,
  });

  const [userUCCInfo, setUserUCCInfo] = useState<UserUCCInfo>({
    userId: 0,
    usersInfo: null,
    recentActivities: [],
    activityLength: 0,
  });

  async function initWallet() {
    try {
      const _provider = await getWeb3Provider();
      const _signer = await _provider.getSigner();
      const _userAddress = await _signer.getAddress();

      // Presale Contract
      const ps = new ethers.Contract(ADDRESSES.PRESALE, PRESALE_ABI, _signer);
      setUserAddress(_userAddress);

      console.log(_userAddress);
      const ucci = await getUCCInfo(ps);
      const useri = await getUserInfo(ps, _userAddress, curPage);
      setUCCInfo(ucci);
      setUserUCCInfo(useri);
    } catch (error) {
      console.error(error);
    }
  }

  function getReferralId(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    const ref = parseInt(refParam || '0', 10);
    if (isNaN(ref)) {
      console.error('Invalid referral ID:', refParam);
      toast.error('Invalid referral ID', { duration: 3000, position: 'top-right' });
      return 0;
    }
    return ref;
  }

  const buyWithUSDT = async (amount: string) => {
    try {
      const _provider = await getWeb3Provider();
      const _signer = await _provider.getSigner();
      const _userAddress = await _signer.getAddress();
      const ps = new ethers.Contract(ADDRESSES.PRESALE, PRESALE_ABI, _signer);
      const ua = new ethers.Contract(ADDRESSES.USDT, ERC20_ABI, _signer);

      const ref = getReferralId();

      setStatus(PurchaseStatus.APPROVING);
      const parsedAmount = ethers.parseUnits(amount, 18);
      const approveTx = await ua.approve(ADDRESSES.PRESALE, parsedAmount);
      await approveTx.wait();
      setStatus(PurchaseStatus.APPROVED);

      setStatus(PurchaseStatus.PURCHASING);
      const buyTx = await ps.buy(_userAddress, ref, parsedAmount);
      await buyTx.wait();

      const ucci = await getUCCInfo(ps);
      const useri = await getUserInfo(ps, _userAddress, 1);
      setUCCInfo(ucci);
      setUserUCCInfo(useri);

      setStatus(PurchaseStatus.CONFIRMED);
      toast.success('Purchase completed successfully!', { duration: 3000, position: 'top-right' });
      setStatus(PurchaseStatus.IDLE);
    } catch (error: any) {
      console.error('Error during USDT purchase:', error);
      setStatus(PurchaseStatus.ERROR);
      toast.error(error.reason || 'An unexpected error occurred.', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const buyWithBNB = async (amount: string) => {
    try {
      const _provider = await getWeb3Provider();
      const _signer = await _provider.getSigner();
      const _userAddress = await _signer.getAddress();
      const ps = new ethers.Contract(ADDRESSES.PRESALE, PRESALE_ABI, _signer);

      const ref = getReferralId();

      setStatus(PurchaseStatus.PURCHASING);
      const parsedAmount = ethers.parseEther(amount);
      const buyTx = await ps.buy(_userAddress, ref, 0, { value: parsedAmount });
      await buyTx.wait();

      const ucci = await getUCCInfo(ps);
      const useri = await getUserInfo(ps, _userAddress, 1);
      setUCCInfo(ucci);
      setUserUCCInfo(useri);

      setStatus(PurchaseStatus.CONFIRMED);
      toast.success('Purchase completed successfully!', { duration: 3000, position: 'top-right' });
      setStatus(PurchaseStatus.IDLE);
    } catch (error: any) {
      console.error('Error during BNB purchase:', error);
      setStatus(PurchaseStatus.ERROR);
      toast.error(error.reason || 'An unexpected error occurred.', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  async function getUCCInfo(ps: ethers.Contract): Promise<UCCInfo> {
    try {
      const totalInvestmentsUSDT = await ps.totalInvestmentsUSDT();
      const totalInvestmentsBNB = await ps.totalInvestmentsBNB();
      const totalUsers = await ps.totalUsers();
      const priceUSDT = await ps.price();
      const priceBNB = await ps.priceBNB();
      const totalTokensToBEDistributed = await ps.totalTokensToBEDistributed();

      setTotalToken(b2i(totalTokensToBEDistributed));

      return {
        totalInvestmentsUSDT: b2i(totalInvestmentsUSDT),
        totalInvestmentsBNB: b2f(totalInvestmentsBNB),
        totalUsers,
        priceUSDT: b2f(priceUSDT),
        priceBNB: b2f(priceBNB),
        totalTokensToBEDistributed: b2i(totalTokensToBEDistributed),
      };
    } catch (error: any) {
      console.error(error);
      return {
        totalInvestmentsUSDT: 0,
        totalInvestmentsBNB: 0,
        totalUsers: 0,
        priceUSDT: 0,
        priceBNB: 0,
        totalTokensToBEDistributed: 0,
      };
    }
  }

  async function getUserInfo(ps: ethers.Contract, ua: string, cpage: number): Promise<UserUCCInfo> {
    try {
      const userId = await ps.id(ua);
      const usersInfo = await ps.usersInfo(userId);
      let activityLength = 0;
      let recentActivities = [];
      try {
        if (parseInt(userId.toString()) === 0) {
          recentActivities = [];
          activityLength = 0;
        } else {
          activityLength = await ps.getUserActivitiesLength(userId);
          recentActivities = await ps.getRecentActivities(userId, cpage);
        }
      } catch {
        recentActivities = [];
        activityLength = 0;
      }

      return {
        userId: userId,
        usersInfo: userId === 0 ? null : usersInfo,
        recentActivities,
        activityLength: parseInt(activityLength.toString()),
      };
    } catch (error: any) {
      console.error(error);
      return {
        userId: 0,
        usersInfo: null,
        recentActivities: [],
        activityLength: 0,
      };
    }
  }

  const resetStatus = () => setStatus(PurchaseStatus.IDLE);

  return {
    status,
    uccInfo,
    userUCCInfo,
    userAddress,
    totalTokens,
    curPage,
    setCurPage,
    buyWithUSDT,
    buyWithBNB,
    resetStatus,
    initWallet,
  };
}

export function b2i(amt: any): number {
  return parseInt(formatUnits(amt, 18));
}

export function b2f(amt: any): number {
  return parseFloat(formatUnits(amt, 18));
}
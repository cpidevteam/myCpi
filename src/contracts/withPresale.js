export default [
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'deals',
    outputs: [
      { name: 'rewardTokenAddress', type: 'address' },
      { name: 'isCancelled', type: 'bool' },
      { name: 'isCancelRequestedByMerchant', type: 'bool' },
      { name: 'rewardRatePpm', type: 'uint256' },
      { name: 'daysOfCancellation', type: 'uint256' },
      { name: 'daysBeforeClose', type: 'uint256' },
      { name: 'createdAt', type: 'uint256' },
      { name: 'cancelRequestedAt', type: 'uint256' },
      { name: 'leftStakeAmount', type: 'uint256' },
      { name: 'affiliatesCount', type: 'uint256' },
      { name: 'lockedTokensAmount', type: 'uint256' },
      { name: 'dealId', type: 'bytes4' },
      { name: 'allowAdminToAddAffiliate', type: 'bool' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'canBeCancelledByMerchant',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'affiliates',
    outputs: [
      { name: 'affiliateAddress', type: 'address' },
      { name: 'isBlocked', type: 'bool' },
      { name: 'rewardAmount', type: 'uint256' },
      { name: 'affiliateRewardsCount', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getTimelockLogic',
    outputs: [{ name: '_timeLocks', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'cancelAllDealsByMerchant',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }],
    name: 'affiliateDealIndexes',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_stage', type: 'uint256' }],
    name: 'getStartTimeAtStage',
    outputs: [{ name: 'time', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_referenceHash', type: 'uint256' }],
    name: 'getReferenceHashInfo',
    outputs: [{ name: '', type: 'address' }, { name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'getMyStakeBack',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'dealsCount',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'affiliatesCount',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_now', type: 'uint256' }],
    name: 'getMinInvAt',
    outputs: [{ name: 'inv', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_timeLocks', type: 'uint256[]' }],
    name: 'setTimelockLogic',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' },
      { name: '_a', type: 'bytes32' },
      { name: '_b', type: 'bytes32' },
    ],
    name: 'invest',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_stage', type: 'uint32' }],
    name: 'getMinInvAtStage',
    outputs: [{ name: 'inv', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_affiliateAddress', type: 'address' }],
    name: 'getDealIndexesByAffiliate',
    outputs: [{ name: '', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getParams',
    outputs: [
      { name: '_times', type: 'uint256[]' },
      { name: '_rates', type: 'uint256[]' },
      { name: '_minInvs', type: 'uint256[]' },
      { name: '_maxInvs', type: 'uint256[]' },
      { name: '_wallet', type: 'address' },
      { name: '_token', type: 'address' },
      { name: '_signer', type: 'address' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_stage', type: 'uint32' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'setMaxInvestmentAtStage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_dealIndex', type: 'uint256' },
      { name: '_affiliateAddress', type: 'address' },
    ],
    name: 'getReferenceHash',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_dealIndex', type: 'uint256' },
      { name: '_affiliateAddress', type: 'address' },
    ],
    name: 'approveAffiliate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'affiliateDealIndexesCount',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_stage', type: 'uint32' }],
    name: 'getMaxInvAtStage',
    outputs: [{ name: 'inv', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'isDealCancelled',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_stage', type: 'uint256' },
      { name: '_newRate', type: 'uint256' },
    ],
    name: 'updateRateAtStage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_newAdminAddress', type: 'address' }],
    name: 'changeAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getTokenIsTilm',
    outputs: [{ name: 'isTilm', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_isTilm', type: 'bool' }],
    name: 'setTokenIsTilm',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_referenceHash', type: 'uint256' }],
    name: 'getDealIndex',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_dealIndex', type: 'uint256' },
      { name: '_amount', type: 'uint256' },
    ],
    name: 'fillStake',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_dealId', type: 'bytes4' },
      { name: '_rewardTokenAddress', type: 'address' },
      { name: '_rewardRatePpm', type: 'uint256' },
      { name: '_daysOfCancellation', type: 'uint256' },
      { name: '_daysBeforeClose', type: 'uint256' },
      { name: '_allowAdminToAddAffiliate', type: 'bool' },
    ],
    name: 'createDeal',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'merchantAddress',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'getDynamicDealInfo',
    outputs: [{ name: '', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'dealIndexToId',
    outputs: [{ name: '', type: 'bytes4' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_stage', type: 'uint256' },
      { name: '_newTime', type: 'uint256' },
    ],
    name: 'updateStartTimeAtStage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }, { name: '', type: 'address' }],
    name: 'dealAffiliateReferenceHash',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_referenceHash', type: 'uint256' }],
    name: 'toggleBlockAffiliate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_dealId', type: 'bytes4' }],
    name: 'dealIdToIndex',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'getMyReward',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'cancelDealByAdmin',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_stage', type: 'uint256' }],
    name: 'getRateAtStage',
    outputs: [{ name: 'rate', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_dealIndex', type: 'uint256' },
      { name: '_newRewardRatePpm', type: 'uint256' },
    ],
    name: 'updateDeal',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_now', type: 'uint256' }],
    name: 'getMaxInvAt',
    outputs: [{ name: 'inv', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_referenceHash', type: 'uint256' },
      { name: '_affiliateRewardIndex', type: 'uint256' },
    ],
    name: 'getAffiliateRewardInfo',
    outputs: [{ name: '', type: 'uint256' }, { name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'cancelDealByMerchant',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_dealIndex', type: 'uint256' }],
    name: 'isDealClosed',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }, { name: '', type: 'address' }],
    name: 'dealAffiliateReferenceHashCount',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'referenceHashDealIndex',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_stage', type: 'uint32' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'setMinInvestmentAtStage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'adminAddress',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_timesAndRates', type: 'uint256[]' },
      { name: '_wallet', type: 'address' },
      { name: '_token', type: 'address' },
      { name: '_signer', type: 'address' },
      { name: '_admin', type: 'address' },
      { name: '_merchant', type: 'address' },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'purchaser', type: 'address' },
      { indexed: true, name: 'affiliate', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: true, name: 'orderID', type: 'bytes4' },
    ],
    name: 'TokenPurchase',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'previousOwner', type: 'address' }],
    name: 'OwnershipRenounced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'previousOwner', type: 'address' },
      { indexed: true, name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: true, name: '_merchantAddress', type: 'address' },
      { indexed: true, name: '_dealIndex', type: 'uint256' },
      { indexed: true, name: '_affiliateAddress', type: 'address' },
      { indexed: false, name: '_referenceHash', type: 'uint256' },
    ],
    name: 'ApproveAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_dealIndex', type: 'uint256' },
      { indexed: true, name: '_merchantAddress', type: 'address' },
      { indexed: true, name: '_rewardTokenAddress', type: 'address' },
      { indexed: false, name: '_rewardRatePpm', type: 'uint256' },
      { indexed: false, name: '_daysOfCancellation', type: 'uint256' },
      { indexed: false, name: '_daysBeforeClose', type: 'uint256' },
      { indexed: false, name: '_dealsCount', type: 'uint256' },
    ],
    name: 'CreateDeal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_referenceHash', type: 'uint256' },
      { indexed: false, name: '_isBlocked', type: 'bool' },
    ],
    name: 'ToggleBlockAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_days', type: 'uint256' },
      { indexed: false, name: '_who', type: 'address' },
    ],
    name: 'DealCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_fill', type: 'uint256' },
      { indexed: false, name: '_left', type: 'uint256' },
    ],
    name: 'StakeFilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_referenceHash', type: 'uint256' },
      { indexed: false, name: '_rewardAmount', type: 'uint256' },
    ],
    name: 'RewardClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_newRewardRatePpm', type: 'uint256' },
    ],
    name: 'DealUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: '_dealId', type: 'bytes4' },
      { indexed: false, name: '_referenceHash', type: 'uint256' },
      { indexed: false, name: '_purchasedTokenAmount', type: 'uint256' },
      { indexed: false, name: '_rewardAmount', type: 'uint256' },
    ],
    name: 'RewardCreated',
    type: 'event',
  },
];

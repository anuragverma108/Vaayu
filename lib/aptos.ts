import { Account } from "@aptos-labs/ts-sdk"

// Aptos wallet and blockchain utilities
export interface AptosWallet {
  address: string
  privateKey: string
  publicKey: string
}

export interface HealthProfile {
  name: string
  age: number
  gender: string
  chronicCondition: string[]
  preferredWalkTime: string
  pollutionSensitivity: string
  location: string
}

// Generate a new Aptos wallet (real implementation)
export function createWallet(): AptosWallet {
  const account = Account.generate();
  return {
    address: account.accountAddress.toString(),
    privateKey: account.privateKey.toString(),
    publicKey: account.publicKey.toString(),
  };
}

// Store wallet in session storage with user-specific key
export function storeWallet(wallet: AptosWallet, userId?: string): void {
  if (typeof window !== "undefined") {
    const key = userId ? `aptos_wallet_${userId}` : "aptos_wallet"
    sessionStorage.setItem(key, JSON.stringify(wallet))
  }
}

// Retrieve wallet from session storage with user-specific key
export function getStoredWallet(userId?: string): AptosWallet | null {
  if (typeof window !== "undefined") {
    const key = userId ? `aptos_wallet_${userId}` : "aptos_wallet"
    const stored = sessionStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  }
  return null
}

// Clear wallet from session storage with user-specific key
export function clearWallet(userId?: string): void {
  if (typeof window !== "undefined") {
    const key = userId ? `aptos_wallet_${userId}` : "aptos_wallet"
    sessionStorage.removeItem(key)
  }
}

// Submit health profile to Aptos blockchain (mock implementation)
export async function submitProfileTransaction(
  wallet: AptosWallet,
  profileData: HealthProfile,
): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock transaction hash
    const transactionHash = `0x${generateRandomHex(64)}`

    console.log("Submitting profile to Aptos blockchain:", {
      wallet: wallet.address,
      profile: profileData,
      transactionHash,
    })

    // In a real implementation, you would:
    // 1. Create a Move transaction
    // 2. Sign it with the private key
    // 3. Submit to Aptos network
    // 4. Wait for confirmation

    return {
      success: true,
      transactionHash,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Helper function to generate random hex strings
function generateRandomHex(length: number): string {
  const chars = "0123456789abcdef"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

// Check if user has a wallet with user-specific key
export function hasWallet(userId?: string): boolean {
  return getStoredWallet(userId) !== null
}

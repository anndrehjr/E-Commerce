export async function calculateShipping(cep, cartTotal) {
  // Basic shipping calculation based on cart total
  // In a real application, you would integrate with a shipping API
  if (!cep || cep.length !== 8) {
    throw new Error('CEP inválido');
  }

  // Example shipping calculation
  const baseShipping = 15;
  const weightFactor = cartTotal * 0.01;
  
  return baseShipping + weightFactor;
}


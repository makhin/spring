import ContractsRepository from './ContractsRepository';

export function createRepositories() {
  const contractsRepository = new ContractsRepository();
  return {
    ["Contracts"]: contractsRepository,
  };
}

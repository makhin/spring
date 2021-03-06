import ContractsRepository from './ContractsRepository';
import { REPO_CONTRACTS } from 'app/constants/repositories';

export function createRepositories() {
  const contractsRepository = new ContractsRepository();
  return {
    [REPO_CONTRACTS]: contractsRepository,
  };
}

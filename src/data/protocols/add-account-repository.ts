import { AccountModel } from 'domain/models/account'
import { AddAccountModel } from 'domain/usecase/add-account'

export interface AddAccountRepository {
  add (account: AddAccountModel): Promise<AccountModel>
}

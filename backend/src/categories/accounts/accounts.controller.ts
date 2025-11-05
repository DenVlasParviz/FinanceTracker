import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from '../DTO/accounts/create-account.dto';
import { UpdateAccountDto } from '../DTO/accounts/update-accounts.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async getAccounts() {
    return this.accountsService.findAll();
  }

  @Post()
  async createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.create(dto);
  }

  @Patch(':id')
  async updateAccount(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.accountsService.update(id, dto);
  }
}

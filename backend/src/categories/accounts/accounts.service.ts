import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../db';
import { accountsTable } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateAccountDto } from '../DTO/accounts/create-account.dto';
import { UpdateAccountDto } from '../DTO/accounts/update-accounts.dto';

@Injectable()
export class AccountsService {
  async findAll() {
    const rows = await db.select().from(accountsTable).orderBy(accountsTable.createdAt).execute();
    return rows;
  }

  async create(dto: CreateAccountDto) {
    const now = new Date();
    const result = await db
      .insert(accountsTable)
      .values({
        id: crypto.randomUUID(),
        name: dto.name,
        balance: dto.balance ?? 0,
        createdAt: now,
        updatedAt: now,
      })
      .returning()
      .execute();
    return result[0];
  }

  async update(id: string, dto: UpdateAccountDto) {
    const existing = await db.select().from(accountsTable).where(eq(accountsTable.id, id)).execute();
    if (!existing.length) throw new NotFoundException('Account not found');

    const updatedRes = await db
      .update(accountsTable)
      .set({
        name: dto.name ?? existing[0].name,
        balance: typeof dto.balance === 'number' ? dto.balance : existing[0].balance,
        updatedAt: new Date(),
      })
      .where(eq(accountsTable.id, id))
      .returning()
      .execute();

    return updatedRes[0];
  }
}

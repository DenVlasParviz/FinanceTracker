import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { BudgetModule } from './categories/budget/budget.module';
import { AccountsModule } from './categories/accounts/accounts.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),CategoriesModule,BudgetModule,AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

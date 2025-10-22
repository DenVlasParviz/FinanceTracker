import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { BudgetModule } from './categories/budget/budget.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),CategoriesModule,BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

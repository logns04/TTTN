import inquirer from 'inquirer';
import chalk from 'chalk';

import { ConfigLoader } from './config/config-loader';
import { DatabaseFactory } from './factory/database-factory';
import { HistoryService } from './services/history.service';

async function main() {
  let config;

  try {
    config = ConfigLoader.load();
  } catch (error) {
    console.log('Invalid Config');

    console.log(error);

    return;
  }

  const driver = DatabaseFactory.create(config);

  while (true) {
    console.clear();

    console.log(chalk.cyan(`DATABASE TOOL`));

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select:',
        choices: ['Backup', 'Restore', 'Verify', 'Rollback', 'History', 'Exit'],
      },
    ]);

    try {
      switch (action) {
        case 'Backup': {
          const { testConnection } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'testConnection',
              message: 'Đồng ý Test Connection?',
              default: true,
            },
          ]);

          if (!testConnection) {
            break;
          }

          console.log(chalk.yellow('Testing Connection...'));

          const connected = await driver.test();

          if (!connected) {
            console.log(chalk.red('Connection Failed'));

            break;
          }

          console.log(chalk.green('Connection Passed'));

          try {
            await driver.backup();
          } catch (error) {
            console.log('Backup Failed');
          }

          break;
        }

        case 'Restore': {
          const { backupPath } = await inquirer.prompt([
            {
              type: 'input',
              name: 'backupPath',
              message: 'Đường dẫn backup:',
            },
          ]);

          try {
            await driver.restore(backupPath);
          } catch {
            console.log('Restore Failed');
          }

          break;
        }

        case 'Verify': {
          const verified = await driver.verify();

          if (verified) {
            console.log(chalk.green('VERIFY PASS'));
          } else {
            console.log(chalk.red('VERIFY FAIL'));
          }

          break;
        }

        case 'Rollback': {
          try {
            await driver.rollback();
          } catch (error) {
            console.log('');

            console.log('Rollback Failed');

            console.log(error);
          }

          console.log(chalk.green('Rollback Success'));

          break;
        }

        case 'History': {
          const history = await HistoryService.getAll();

          if (history.length === 0) {
            console.log(chalk.yellow('No History Found'));
          } else {
            console.table(history);
          }

          break;
        }

        case 'Snapshot Test': {
          try {
            await driver.createSnapshot();
          } catch (error) {
            console.log('');

            console.log('Snapshot Failed');

            console.log(error);
          }

          break;
        }

        case 'Exit':
          process.exit(0);
      }
    } catch (error) {
      console.log(chalk.red('ERROR'));

      console.log(error);
    }

    await inquirer.prompt([
      {
        type: 'input',
        name: 'pause',
        message: 'Press Enter...',
      },
    ]);
  }
}

main().catch((error) => {
  console.log('');

  console.log('Unexpected Error');

  console.log(error);
});

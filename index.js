const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(chalk.green(`
  ██▀███   ▄▄▄       ███▄    █   ▄████   ▄████  ▄▄▄      
▓██ ▒ ██▒▒████▄     ██ ▀█   █  ██▒ ▀█▒ ██▒ ▀█▒▒████▄    
▓██ ░▄█ ▒▒██  ▀█▄  ▓██  ▀█ ██▒▒██░▄▄▄░▒██░▄▄▄░▒██  ▀█▄  
▒██▀▀█▄  ░██▄▄▄▄██ ▓██▒  ▐▌██▒░▓█  ██▓░▓█  ██▓░██▄▄▄▄██ 
░██▓ ▒██▒ ▓█   ▓██▒▒██░   ▓██░░▒▓███▀▒░▒▓███▀▒ ▓█   ▓██▒
░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ▒░   ▒ ▒  ░▒   ▒  ░▒   ▒  ▒▒   ▓▒█░
  ░▒ ░ ▒░  ▒   ▒▒ ░░ ░░   ░ ▒░  ░   ░   ░   ░   ▒   ▒▒ ░
  ░░   ░   ░   ▒      ░   ░ ░ ░ ░   ░ ░ ░   ░   ░   ▒   
   ░           ░  ░         ░       ░       ░       ░  ░
                                                       

  const auth = rs.question('Enter Authentication Code! : ');
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Authentication Code Not Valid`));
      break;

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalk.red(`\r
-  [${moment().format('HH:mm:ss')}]  -
>  ${(`Negara  : ${country}`)}
>  ${(`Nama  : ${username}`)}  
>  ${(`Piala  : ${trophy}`)}  
>  ${(`Mahkota  : ${crown}`)}
>  ${(`Status : Success !`)}`));
      await sleep(3000);


    } else if (result == 'Kasian') {
      console.log(chalk.bgRed(`Akun Lu Dah Kena Ban Tobattt!!`));
     break;
    }
  }


})();

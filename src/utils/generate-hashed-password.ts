import { hashPassword } from '@/lib/login/password-hashing';

(async () => {
  const myPassword = ''; // NÃO ESQUECER DE APAGAR SUA SENHA DAQUI
  const hashForYourPasswordInBase64 = await hashPassword(myPassword);

  console.log({ hashForYourPasswordInBase64 });
})();

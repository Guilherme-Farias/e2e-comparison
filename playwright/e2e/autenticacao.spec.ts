import { ENV } from '../../env';
import { expect, test } from '../utils';

test('Login - Email e senha inválidos', async ({ page, login }) => {
  await login({
    email: 'invalid_email',
    password: 'invalid_password',
  });
  await expect(page.getByText('E-mail ou senha inválidos')).toBeVisible();
});

test('Login - Email inválido', async ({ page, login }) => {
  await login({
    email: 'invalid_email',
    password: ENV.ADMIN_PASSWORD,
  });
  await expect(page.getByText('E-mail ou senha inválidos')).toBeVisible();
});

test('Login - Senha inválida', async ({ page, login }) => {
  await login({
    email: ENV.ADMIN_EMAIL,
    password: 'invalid_password',
  });
  await expect(page.getByText('E-mail ou senha inválidos')).toBeVisible();
});

test('Login com sucesso', async ({ page, login }) => {
  await login({
    email: ENV.ADMIN_EMAIL,
    password: ENV.ADMIN_PASSWORD,
  });

  const firstName = ENV.ADMIN_NAME.split(' ')[0]!;

  await expect(page.getByText(firstName)).toBeVisible();
});

test('Login de um usuário com perfil Colaborador', async ({ page, login }) => {
  await login({
    email: ENV.COLABORADOR_EMAIL,
    password: ENV.COLABORADOR_PASSWORD,
  });

  const firstName = ENV.COLABORADOR_NAME.split(' ')[0]!;
  await expect(page.getByText(firstName)).toBeVisible();

  await expect(page).toHaveURL(`${ENV.TASK_URL}/Dashboard`);
});

test('Login de um usuário com perfil Gerente', async ({ page, login }) => {
  await login({
    email: ENV.GERENTE_EMAIL,
    password: ENV.GERENTE_PASSWORD,
  });

  const firstName = ENV.GERENTE_NAME.split(' ')[0]!;
  await expect(page.getByText(firstName)).toBeVisible();

  await expect(page).toHaveURL(`${ENV.TASK_URL}/Dashboard`);
});

test('Login de um usuário com perfil Comercial - Acesso ao Cash', async ({
  page,
  login,
}) => {
  await login({
    email: ENV.COMERCIAL_EMAIL,
    password: ENV.COMERCIAL_PASSWORD,
  });

  const firstName = ENV.COMERCIAL_NAME.split(' ')[0]!;
  await expect(page.getByText(firstName)).toBeVisible();

  await page.getByRole('button', { name: 'Cash' }).click();

  await expect(page).toHaveURL(`${ENV.CASH_URL}/ServiceSale/Index`);
});

test('Login de um usuário com perfil Comercial - Acesso ao Task', async ({
  page,
  login,
}) => {
  await login({
    email: ENV.COMERCIAL_EMAIL,
    password: ENV.COMERCIAL_PASSWORD,
  });

  const firstName = ENV.COMERCIAL_NAME.split(' ')[0]!;
  await expect(page.getByText(firstName)).toBeVisible();

  await page.getByRole('button', { name: 'Task' }).click();

  await expect(page.getByText(firstName)).toBeVisible();

  await expect(page).toHaveURL(`${ENV.TASK_URL}/Dashboard`);
});

test('Login de um usuário com perfil Assistente Administrativo - Acesso ao Cash', async ({
  page,
  login,
}) => {
  await login({
    email: ENV.ASSISTENTE_ADMINISTRATIVO_EMAIL,
    password: ENV.ASSISTENTE_ADMINISTRATIVO_PASSWORD,
  });

  const firstName = ENV.ASSISTENTE_ADMINISTRATIVO_NAME.split(' ')[0]!;
  await expect(page.getByText(firstName)).toBeVisible();

  await page.getByRole('button', { name: 'Cash' }).click();

  await expect(page).toHaveURL(`${ENV.CASH_URL}`);
  await expect(page.getByRole('heading', { name: 'Extrato' })).toBeVisible();
});

test('Login de um usuário com perfil Assistente Administrativo - Acesso ao Task', async ({
  page,
  login,
}) => {
  await login({
    email: ENV.ASSISTENTE_ADMINISTRATIVO_EMAIL,
    password: ENV.ASSISTENTE_ADMINISTRATIVO_PASSWORD,
  });

  const firstName = ENV.ASSISTENTE_ADMINISTRATIVO_NAME.split(' ')[0]!;
  await expect(page.getByText(firstName)).toBeVisible();

  await page.getByRole('button', { name: 'Task' }).click();

  await expect(page.getByText(firstName)).toBeVisible();

  await expect(page).toHaveURL(`${ENV.TASK_URL}/Dashboard`);
});

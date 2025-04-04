import { test } from '@playwright/test';

test('Auction Properties Download By Caixa', async ({ page }) => {
  await page.goto(
    'https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp',
  );
  const waitForDownloadEvent = page.waitForEvent('download');
  await page.waitForSelector('#cmb_estado');
  await page.selectOption('#cmb_estado', { value: 'geral' });
  await page.click('#btn_next1');
  const download = await waitForDownloadEvent;
  await download.saveAs('./src/temp/auction_properties.csv');
});

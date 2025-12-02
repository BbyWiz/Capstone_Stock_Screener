import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1JFaF1cXGFCf1FpRmJGfV5ycUVBal5ZTnNaUj0eQnxTdEBiW39fcX1XT2BcUkF1WUleYg=='
);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

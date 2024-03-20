import 'windi.css';
import installer from './defaults';

export * from './components';

export * from './_utils';

export * from './directives';

export const install = installer.install;
export const version = installer.version;

export default installer;

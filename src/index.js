import { AppState } from "./logic/manager";
import { UI } from "./ui/domLoader";
import './ui/styles.css';

AppState.loadData();

UI.init();
UI.render();
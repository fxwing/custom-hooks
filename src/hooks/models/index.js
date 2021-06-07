//   dva类型的  数据流
import { createContext } from "react";
import globalModel from "./global";
import {
  generateProvider,
  generateUseModel,
  generateLoadingModel,
} from "./cors";

const allModel = {
  loading: generateLoadingModel(),
  global: globalModel,
};

const context = createContext();

const ConetxtProvider = generateProvider({ allModel, context });
const useModel = generateUseModel({ allModel, context });

export { ConetxtProvider, useModel };

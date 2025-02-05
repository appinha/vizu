import MockAdapter from "axios-mock-adapter";
import { capitalize } from "lodash";

import axiosInstance from "@/api/axiosInstance";
import { monthExpensesMock } from "@/testing/mocks/expenses";
import { HttpMethod } from "@/types";

const ERROR_RESPONSE = "Unknown error";

type EndpointConfig = {
  method: HttpMethod;
  url: string;
  status: number;
  data: unknown;
};
const ENDPOINT_CONFIGS: EndpointConfig[] = [
  // api/getExpenses
  { method: "GET", url: "/expenses/", status: 200, data: monthExpensesMock },
];

const configMock = (args: {
  apiMock: MockAdapter;
  method: HttpMethod;
  url: string;
  status: number;
  data: unknown;
  simulateErrorOn: string[];
}) => {
  const { apiMock, method, url, status, data, simulateErrorOn } = args;
  const simulateError = simulateErrorOn.includes(url);
  const mockMethod = apiMock[`on${capitalize(method)}`].bind(apiMock);

  if (simulateError) mockMethod(url).reply(500, ERROR_RESPONSE);
  else mockMethod(url).reply(status, data);
};

type Args = {
  noMocks?: boolean;
  simulateErrorOn?: string[];
};

export default function applyMockAdapter(args: Args = {}) {
  const { noMocks = false, simulateErrorOn = [] } = args;
  const apiMock = new MockAdapter(axiosInstance);

  if (noMocks) return apiMock;

  for (const config of ENDPOINT_CONFIGS)
    configMock({ ...config, apiMock, simulateErrorOn });

  apiMock.onAny().reply((config) => {
    const url = config.url ?? "Unknown URL";
    return [500, { status: `Endpoint not mocked: ${url}` }];
  });

  return apiMock;
}

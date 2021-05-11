import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  /** 获取区块链总览信息 */
  getSummary() {
    return this.http.get<Network>('/api/summary').toPromise();
  }

  getBlocks(limit: number, offset: number) {
    return this.http.get<{
      limit: number,
      offset: number,
      result: Block[],
      total: number
    }>(`/api/blocks`, {
      params: {
        limit: limit.toString(),
        offset: offset.toString()
      }
    }).toPromise();
  }

  getBlock(height: number) {
    return this.http.get<Block>(`/api/blocks/${height}`).toPromise();
  }

  getTxs(limit: number, offset?: number, height?: number, address?: string) {
    const params = {
      limit: limit.toString(),
      offset: offset ? offset.toString() : '0'
    };

    if (address) params['address'] = address;
    if (height) params['height'] = height.toString();

    return this.http.get<{
      result: Tx[],
      total: number
    }>('/api/txs', { params }).toPromise();
  }

  getTx(tx: string) {
    return this.http.get<Tx>(`/api/txs/${tx}`).toPromise();
  }

  getNames(limit: number, offset: number, status?: string, type?: string) {
    const params = {
      limit: limit.toString(),
      offset: offset ? offset.toString() : '0'
    };

    if (status) params['status'] = status;
    if (type) params['type'] = type;

    return this.http.get<{
      limit: number,
      offset: number,
      result: Name[],
      total: number
    }>('/api/names', { params }).toPromise();
  }

  getName(name: string) {
    return this.http.get<Name>(`/api/names/${name}`).toPromise();
  }

  getNameHistory(name: string) {
    return this.http.get<{
      total: number,
      offset: number,
      limit: number,
      result: NameHistory[]
    }>(`/api/names/${name}/history`).toPromise();
  }

  getAddress(addr: string) {
    return this.http.get<Address>(`/api/addresses/${addr}`).toPromise();
  }

  search(query: string) {
    return this.http.get<Search[]>('/api/search?q=' + query).toPromise();
  }

  getCharts(type: string, startTime: number, endTime: number) {
    return this.http.get<Chart[]>(`/api/charts/${type}`, {
      params: {
        startTime: startTime.toString(),
        endTime: endTime.toString()
      }
    }).toPromise();
  }

  getBlockDistribution(startTime: number, endTime: number) {
    return this.http.get<Distribution>('/api/pool/distribution', {
      params: {
        startTime: startTime.toString(),
        endTime: endTime.toString()
      }
    }).toPromise();
  }
}

interface Network {
  chainWork: string,
  difficulty: number,
  hashrate: number,
  network: string,
  registeredNames: number,
  unconfirmed: number,
  unconfirmedSize: number
}

interface Input {
  coinbase: boolean,
  address: string,
  value: number
}

interface Output {
  action: string,
  address: string,
  value: number,
  name: string,
  nameHash: string
}

interface Tx {
  block: string,
  confirmations: number,
  fee: number,
  hash: string,
  height: number,
  hex: string,
  index: number,
  inputs: Input[],
  locktime: number,
  mtime: number,
  outputs: Output[],
  rate: number,
  time: number,
  version: number,
  witnessHash: string
}

interface Block {
  averageFee: number,
  bits: number,
  chainwork: string,
  coinbase: string[],
  confirmations: number,
  difficulty: number,
  fees: number,
  hash: string,
  height: number,
  mask: string,
  medianTime: number,
  merkleRoot: string,
  miner: string,
  nextHash: string | null,
  nonce: number,
  pool: {
    name: string,
    url: string
  },
  prevBlock: string | null,
  reservedRoot: string,
  size: number,
  strippedSize: number,
  time: number,
  treeRoot: string,
  tx: { result: Tx[] }[],
  txs: number,
  version: number,
  weight: number,
  witnessRoot: string,
}

interface Name {
  claimed: number,
  data: string,
  expired: boolean,
  height: number,
  highest: number,
  name: string,
  nameHash: string,
  owner: { hash: string, index: number },
  registered: boolean,
  renewal: number,
  renewals: number,
  revoked: number,
  state: string,
  stats: { openPeriodStart: number, openPeriodEnd: number, blocksUntilBidding: number, hoursUntilBidding: number },
  transfer: number,
  value: number,
  weak: boolean,
  blocksUntil: number,
  hash: string,
  nextState: string,
  release: number,
  reserved: boolean,
  bids: {
    txid: string,
    lockup: number,
    value: number,
    revealed: boolean,
    win: boolean,
    reveal: {
      txid: string,
      index: number
    }
  }[]
}

interface NameHistory {
  action: string,
  time: number,
  height: number,
  txid: string,
  index: number,
  value: number
}

interface Address {
  confirmed: number,
  hash: string,
  received: number,
  spent: number,
  unconfirmed: number
}

interface Search {
  type: string,
  url: string
}

interface Chart {
  date: number,
  value: string
}

interface Distribution {
  total: number,
  items: {
    poolName: string,
    url: string,
    count: number
  }[]
}

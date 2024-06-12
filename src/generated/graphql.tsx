export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddPlantsToRoomInput = {
  plants?: InputMaybe<Array<InputMaybe<RoomPlantInput>>>;
  roomId: Scalars['String']['input'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  /** This is the token used for authentication (JWT Bearer) */
  token: Scalars['String']['output'];
};

export type CheckPairingProcessResponse = {
  __typename?: 'CheckPairingProcessResponse';
  plantId: Scalars['String']['output'];
  serverPaired: Scalars['Boolean']['output'];
  userPaired: Scalars['Boolean']['output'];
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  plants?: InputMaybe<Array<InputMaybe<RoomPlantInput>>>;
};

export type GetMeasurementsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  plantId: Scalars['String']['input'];
};

export type JoinRoomInput = {
  inviteCode: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Measurement = {
  __typename?: 'Measurement';
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPlantsToRoom?: Maybe<Room>;
  createRoom?: Maybe<Room>;
  deleteRoom?: Maybe<Room>;
  joinRoom?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthResult>;
  pairPlant: Plant;
  register?: Maybe<AuthResult>;
  removePlant: RemovePlantResponse;
  removePlantsFromRoom?: Maybe<Room>;
  updatePlant: Plant;
  updateRoom?: Maybe<Room>;
};


export type MutationAddPlantsToRoomArgs = {
  addPlants: AddPlantsToRoomInput;
};


export type MutationCreateRoomArgs = {
  room: CreateRoomInput;
};


export type MutationDeleteRoomArgs = {
  roomId: Scalars['String']['input'];
};


export type MutationJoinRoomArgs = {
  joinRoom: JoinRoomInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationPairPlantArgs = {
  pairPlantInput: PairPlantInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemovePlantArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePlantsFromRoomArgs = {
  removePlants: RemovePlantsFromRoomInput;
};


export type MutationUpdatePlantArgs = {
  updatePlantInput: UpdatePlantInput;
};


export type MutationUpdateRoomArgs = {
  roomUpdate: UpdateRoomInput;
};

export type PairPlantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pairingCode: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Plant = {
  __typename?: 'Plant';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isOnline: Scalars['Boolean']['output'];
  lastHeartbeat?: Maybe<Scalars['String']['output']>;
  measurements?: Maybe<Array<Maybe<Measurement>>>;
  name: Scalars['String']['output'];
  room?: Maybe<Room>;
  type: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  checkPairingProcess: CheckPairingProcessResponse;
  getMeasurements?: Maybe<Array<Maybe<Measurement>>>;
  ping: Scalars['String']['output'];
  plant?: Maybe<Plant>;
  plants: Array<Maybe<Plant>>;
  room?: Maybe<Room>;
  rooms?: Maybe<Array<Maybe<Room>>>;
};


export type QueryCheckPairingProcessArgs = {
  pairingCode: Scalars['String']['input'];
};


export type QueryGetMeasurementsArgs = {
  getMeasurementsInput?: InputMaybe<GetMeasurementsInput>;
};


export type QueryPlantArgs = {
  id: Scalars['String']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RemovePlantResponse = {
  __typename?: 'RemovePlantResponse';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  unpaired: Scalars['Boolean']['output'];
};

export type RemovePlantsFromRoomInput = {
  plants?: InputMaybe<Array<InputMaybe<RoomPlantInput>>>;
  roomId: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String']['output'];
  inviteCode?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  plants?: Maybe<Array<Maybe<Plant>>>;
};

export type RoomPlantInput = {
  plantId: Scalars['String']['input'];
};

export type UpdatePlantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  plantId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoomInput = {
  name: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

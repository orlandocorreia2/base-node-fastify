export type UserAuctionPropertyFilterProps = {
  id: string;
  userId: string;
  name: string;
  filter: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserAuctionPropertyFilterProps = {
  userId: string;
  name: string;
  filter: string;
};

export type CreateUserAuctionPropertyFilterRequestProps = {
  name: string;
  filter: string;
};

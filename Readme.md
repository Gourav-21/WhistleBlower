# Whistleblower Platform

## User-Focused Summary:
Whistleblower is a decentralized platform designed to enable whistleblowers to report misconduct securely and privately. Users can submit reports without revealing their identities, fostering transparency and accountability within organizations.

## Investor Pitch:
The platform addresses the critical need for secure whistleblowing mechanisms, particularly in environments where individuals fear retaliation for exposing misconduct. By leveraging blockchain technology and Secret smart contracts, Whistleblower ensures the confidentiality of whistleblowers while facilitating the reporting process. This product-market fit addresses the growing demand for transparency and accountability across various sectors.

## Development Deepdive:
The contract logic is implemented using CosmWasm, a framework for writing smart contracts in Rust for the Cosmos blockchain ecosystem. Let's break down the key components and functionalities of the contract:

1. **Instantiation (`instantiate`):**
   - Upon contract instantiation, the `instantiate` function is called.
   - It saves the initial post provided in the `InstantiateMsg` to the storage.
   - This function is executed only once during contract deployment.

2. **Execution (`execute`):**
   - The `execute` function handles different execute messages defined in the `ExecuteMsg` enum.
   - Currently, it supports creating a new post (`CreatePost` message).

3. **Creating a Post (`create_post`):**
   - This function creates a new post with the provided title and description.
   - It constructs a `Post` struct with the title and description.
   - The newly created post is added to the `POSTS` collection in the storage.

4. **Querying (`query`):**
   - The `query` function handles querying messages defined in the `QueryMsg` enum.
   - Currently, it supports getting the latest post.

5. **Getting a Post (`get_post`):**
   - This function retrieves the latest post stored in the contract's storage.
   - It loads the post from the storage using the `POSTS` collection.

#### Storage Management:
- The contract utilizes the `POSTS` singleton to store post data.
- Each post is represented by a `Post` struct containing a title, description and date.
- The `POSTS` singleton is accessed and modified using the provided `Deps` and `DepsMut` instances.

#### Debugging and Error Handling:
- Debugging statements are included throughout the contract logic to aid in development and testing.
- Error handling is essential for ensuring the contract behaves as expected. Currently, the contract does basic error handling by unwrapping results. However, in a production environment, it's crucial to implement proper error handling to handle potential failures gracefully.

#### Conclusion:
The contract logic primarily focuses on enabling users to create and retrieve posts. It leverages CosmWasm's functionalities for storage management, message handling, and error handling. Further enhancements could include additional functionalities such as post editing, deletion, or implementing access control to restrict certain actions to authorized users.



## Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [Typescript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Aceternity ui](https://ui.aceternity.com/) - UI Components
- [Mongoose](https://mongoosejs.com/) - ORM
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) – Hosting

## Getting Started

### Prerequisites

Here's what you need to be able to run WhistleBlower:

- Node.js 
- MongoDB Database - connection string

### First Clone the repository

```shell
git clone https://github.com/Gourav-21/WhistleBlower.git

```

## Set up the contract

### 1. Deploy the smart contracts on a Secret Network testnet


```shell
cd WhistleBlower/contract/node
```
### 2. Install npm dependencies

```shell
npm install
```

### 3. run

```shell
node index.js
```

### 4. copy the `contract address` and `contract hash` from terminal

## Set up the frontend

### 1. go to the next-frontend folder

```shell
cd ../../next-frontend/
```
or if you are in the WhistleBlower folder
```
cd next-frontend 
```

### 2. Install npm dependencies

```shell
npm install
```

### 3. Copy the environment variables to `.env.local` and change the values

```shell
cp .env.example .env.local
```

The following environment variables must be set:
- `CONTRACT_ADDRESS` - The contract address of the WhistleBlower smart contract

- `CONTRACT_HASH` - The contract hash of the WhistleBlower smart contract

- `MONGODB_URI` - The connection string for the MongoDB database



### 4. Run the dev server

```shell
npm run dev
```

### 5. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

### Usage Guidelines:
- Users can navigate to the platform's frontend to view whistleblower posts anonymously.
- To submit a whistleblower report, users doesnt need to create an account.
- So, users can submit a report providing details of the misconduct without revealing their identity.
- Other users can interact with the posts by liking, commenting, and sharing.
- The platform ensures the privacy and security of whistleblowers by encrypting and storing data using Secret smart contracts.

### Additional Information:
- MongoDB is used to store additional details such as post metadata like likes, and comments.
- The frontend is developed using Next.js, providing a seamless user experience.
- Smart contracts are deployed on the Secret Network for privacy and security.
- The platform encourages collaboration and contributions by being open source.

### Demo Video:
- Provide a demonstration video showcasing the functionality of the platform, including the process of submitting a report and interacting with existing posts.
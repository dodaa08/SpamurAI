# AI Cold Email Writer and Sender

AI Cold Email Writer and Sender is a web application designed to help users create and send personalized cold emails efficiently. Built with a combination of AI and blockchain, this application uses natural language processing to generate effective email content and leverages blockchain technology to manage subscriptions with cryptocurrency payments.

## Features

* **AI-Powered Email Writing**: Utilizes Hugging Face's NLP models to generate professional, engaging, and tailored email content.
* **Automated Email Sending**: Quickly send cold emails directly from the platform.
* **Subscription-Based Model**: Built-in subscription model using the Aptos blockchain for secure payments via cryptocurrency.
* **Database Management**: MongoDB handles user information, email content, and subscription details.
* **Backend and API**: Developed with Node.js to manage user requests, email generation, and subscription verification.

## Tech Stack

* **Frontend**: React.js
* **Backend**: Node.js, Express
* **Database**: MongoDB
* **AI Services**: Hugging Face API
* **Blockchain**: Aptos Blockchain (Move smart contracts for subscription payments)

## Getting Started

### Prerequisites

Ensure you have the following installed:
* Node.js
* MongoDB
* React
* Hugging Face API key
* Aptos wallet

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/dodaa08/SpamurAI.git
cd SpamurAI
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set Environment Variables**

Create a `.env` file in the `backend` and `frontend` directories with the following details:

Backend:
```env
MONGODB_URI=<your-mongodb-connection-string>
HUGGINGFACE_API_KEY=<your-huggingface-api-key>
```

Frontend:
```env
REACT_APP_API_URL=<your-backend-api-url>
```

5. **Run the Application**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd ../frontend
npm start
```

## Using the Application

1. **Sign Up**: Register and log in to access the platform.
2. **Subscription**: Choose a subscription plan and pay with cryptocurrency via the Aptos blockchain.
3. **Generate Emails**: Use the AI-powered writer to generate cold email content tailored to your needs.
4. **Send Emails**: Send emails directly from the platform and track email status.

## Blockchain Integration

This project integrates with the Aptos blockchain to handle subscription payments securely. Users can subscribe to the platform by making payments in cryptocurrency, which the smart contract verifies to enable premium access to the AI email generator and sender.

### Smart Contract

The Move contract manages subscriptions, verifies payments, and controls user access to premium features based on their subscription status.

## Future Enhancements

* **Blockchain-Based Email Tracking**: Integrate a feature to verify that emails were sent and opened, possibly storing these records on-chain for added transparency.
* **NFT Access Tiers**: Introduce NFT-based access for different subscription levels. Each NFT could unlock additional features or offer varying usage limits.
* **Referral Rewards**: Blockchain-based referral program for existing subscribers to earn rewards by inviting new users to the platform.

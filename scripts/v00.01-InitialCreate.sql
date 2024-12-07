-- Create Accounts table
CREATE TABLE IF NOT EXISTS Accounts (
    AccountId INT AUTO_INCREMENT PRIMARY KEY,
    AccountName VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create TransactionTypes table
CREATE TABLE IF NOT EXISTS TransactionTypes (
    TransactionTypeId INT AUTO_INCREMENT PRIMARY KEY,
    TypeName VARCHAR(50) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create Transactions table with foreign key references to Accounts and TransactionTypes
CREATE TABLE IF NOT EXISTS Transactions (
    TransactionId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Date DATE NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    AccountId INT NOT NULL,
    Description TEXT,
    TransactionTypeId INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_Account
        FOREIGN KEY (AccountId) REFERENCES Accounts(AccountId),
    CONSTRAINT fk_TransactionType
        FOREIGN KEY (TransactionTypeId) REFERENCES TransactionTypes(TransactionTypeId)
) ENGINE=InnoDB;

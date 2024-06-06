import React, { useState, useEffect, useRef } from "react";
import "daisyui/dist/full.css"; // Ensure DaisyUI is imported

const mockTokens = [
  {
    id: 1,
    name: "Black Michi",
    ticker: "BMichi",
    description:
      "Kaia tokensKaia tokensKaia tokensKaia tokensKaia tokensKaia tokensKaia tokens",
    marketCap: "27.52K",
    creator: "HxTkB0x",
    image:
      "https://lh7-us.googleusercontent.com/ekOEXrq6gf6u8p3D5wOjKkqsyeXTcz5mVXakj5szEDCH1bpiWVeTWGUXw6oZ1kA5GTRGp2PCokr0-Bs1oYgG6higKoYZjBFwVB5shI6aIz7z1x26WZJivdiczcE0-FQY60OhvbfrH8tjuZddsbBRW5A",
  },
  {
    id: 2,
    name: "Pepeblack",
    ticker: "Pepeblack",
    description: "Pepe Black It’s just a Black Pepe 👁️",
    marketCap: "4.71K",
    creator: "7tqA6K",
    image:
      "https://lh7-us.googleusercontent.com/ekOEXrq6gf6u8p3D5wOjKkqsyeXTcz5mVXakj5szEDCH1bpiWVeTWGUXw6oZ1kA5GTRGp2PCokr0-Bs1oYgG6higKoYZjBFwVB5shI6aIz7z1x26WZJivdiczcE0-FQY60OhvbfrH8tjuZddsbBRW5A",
  },
  // Add more mock tokens as needed
];

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = (event) => {
    setTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for token"
      value={term}
      onChange={handleSearch}
      className="input input-bordered w-full max-w-xs bg-white text-black"
    />
  );
};

const TokenItem = ({ token }) => {
  const descriptionRef = useRef(null);
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(false);
  const [cardHeight, setCardHeight] = useState("auto");

  useEffect(() => {
    if (descriptionRef.current) {
      const { clientHeight, scrollHeight } = descriptionRef.current;
      setIsDescriptionTruncated(scrollHeight > clientHeight);
    }
  }, []);

  useEffect(() => {
    setCardHeight(isDescriptionTruncated ? "auto" : "fit-content");
  }, [isDescriptionTruncated]);

  return (
    <div
      className="bg-white shadow-lg m-4 p-2 text-black rounded-xl transition-transform transform hover:scale-105 relative"
      style={{ height: cardHeight }}
    >
      <div className="relative">
        <img
          src={token.image}
          alt={token.name}
          className="w-full h-48 object-cover rounded-xl"
        />
        <figcaption className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
          {token.symbol}
        </figcaption>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{token.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Market Cap: <span className="font-medium">{token.marketCap}</span>
        </p>
        <p className="text-sm text-black mb-2">
          <span className="font-medium">{token.creator}</span>
        </p>
        <br />
        <p
          ref={descriptionRef}
          className={`text-sm text-gray-600 ${
            isDescriptionTruncated ? "line-clamp-2" : ""
          }`}
        >
          {token.description}
          <span className="font-medium">{token.currentPrice}</span>
        </p>
        <div className="mt-5 mb-0 left-0 w-full text-center">
          <button className="btn w-56 btn-neutral">More Info</button>
        </div>
      </div>
    </div>
  );
};

const TokenList = ({ tokens }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenItem key={token.id} token={token} />
      ))}
    </div>
  );
};

const CreateTokenModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [creator, setCreator] = useState("");

  const handleCreate = () => {
    // Logic to create a new token
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black">
        <h2 className="font-bold text-lg">Create a new token</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full my-2 bg-white text-black"
        />
        <input
          type="text"
          placeholder="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="input input-bordered w-full my-2 bg-white text-black"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full my-2 bg-white text-black"
        />
        <input
          type="text"
          placeholder="Market Cap"
          value={marketCap}
          onChange={(e) => setMarketCap(e.target.value)}
          className="input input-bordered w-full my-2 bg-white text-black"
        />
        <input
          type="text"
          placeholder="Creator"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="input input-bordered w-full my-2 bg-white text-black"
        />
        <div className="modal-action">
          <button
            className="btn btn-primary bg-black text-white"
            onClick={handleCreate}
          >
            Create
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className="card bg-white shadow-xl mb-[5rem] p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <img
          src="https://lh7-us.googleusercontent.com/ekOEXrq6gf6u8p3D5wOjKkqsyeXTcz5mVXakj5szEDCH1bpiWVeTWGUXw6oZ1kA5GTRGp2PCokr0-Bs1oYgG6higKoYZjBFwVB5shI6aIz7z1x26WZJivdiczcE0-FQY60OhvbfrH8tjuZddsbBRW5A"
          alt="User Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold text-black">User Name</h2>
          <p className="text-sm text-gray-500">Email: user@example.com</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="stat bg-gray-100 rounded-lg p-4 m-2 flex-1 min-w-0 md:w-1/4">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Tokens Created</div>
          <div className="stat-value text-primary text-lg">4</div>
          <div className="stat-desc text-sm">21% more than last month</div>
        </div>
        <div className="stat bg-gray-100 rounded-lg p-4 m-2 flex-1 min-w-0 md:w-1/4">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Klay Balance</div>
          <div className="stat-value text-primary text-lg">4739 KLAY</div>
        </div>
        <div className="stat bg-gray-100 rounded-lg p-4 m-2 flex-1 min-w-0 md:w-1/4">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Market Cap</div>
          <div className="stat-value text-secondary text-lg">$32.23K</div>
          <div className="stat-desc text-sm">21% more than last month</div>
        </div>
        <div className="stat bg-gray-100 rounded-lg p-4 m-2 flex-1 min-w-0 md:w-1/4">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Market Cap</div>
          <div className="stat-value text-secondary text-lg">$32.23K</div>
          <div className="stat-desc text-sm">21% more than last month</div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [tokens, setTokens] = useState(mockTokens);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4" data-theme="light">
      <nav className="navbar bg-white text-black mb-4 shadow-lg rounded-md p-2">
        <div className="flex-1">
          <a className="text-2xl font-bold text-black rounded-md">kaiapump</a>
        </div>
        <div className="flex-none">
          <button className="btn bg-black text-white">Connect Wallet</button>
        </div>
      </nav>
      <UserProfile />
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            className="btn btn-sm btn-primary bg-black text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Start a new coin
          </button>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>
      {/* Apply grey background and rounded edges to the token list */}
      <div className="bg-gray-50 rounded-lg p-4">
        <TokenList tokens={filteredTokens} />
      </div>
      {isModalOpen && (
        <CreateTokenModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardPage;

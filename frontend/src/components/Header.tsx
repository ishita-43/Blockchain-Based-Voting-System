import React from 'react';

const Header: React.FC = () => {
    return (
        <header>

            <nav className="bg-grey-30 bg-transparent">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="Login">Login</a></li>
                    <li><a href="Voting">Voting</a></li>
                    <li><a href="Results">Results</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
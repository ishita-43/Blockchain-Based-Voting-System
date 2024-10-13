import React from 'react';

const HomePage: React.FC = () => {
    return (
        <>
            <section className="info py-10 px-8">
                <div className="grid gap-5 max-w-5xl mx-auto">
                    <div className="backdrop-blur bg-white/30 bg-opacity-50 rounded-lg shadow-lg p-8">
                        <h2 className="text-4xl font-bold text-center text-blue-600 mb-4">Future of Democracy</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            With the online voting system, voters can participate in elections with just a few clicks, eliminating barriers such as distance, mobility issues, and busy schedules. This enhances the democratic experience and promotes inclusivity and participation.
                            <br /><br />
                            Robust encryption, stringent authentication, and thorough auditing ensure that every vote is accurately and anonymously counted, safeguarding democratic rights. Join us in embracing the future of democracy in Himachal Pradesh.
                        </p>
                    </div>
                </div>

                <p className="alarm text-center text-lg mt-8">An election is happening on June 1st. Exercise your right to vote!</p>
            </section>

            <div className="flex justify-center mt-10">
                <a href="/Voting" className="btn hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg">Go to Voting Page</a>
            </div>
        </>
    );
};

export default HomePage;

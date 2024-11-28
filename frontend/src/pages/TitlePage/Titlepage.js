import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Titlepage.css'; // Import the CSS file

const TitlePage = () => {
    const searchInputRef = useRef(null);
    const textboxRef = useRef(null);
    const navigate = useNavigate();

    // Function to start the full animation and redirect after completion
    const startAnimation = () => {
        textboxRef.current.style.animation = 'turnaround 10s forwards'; // Set animation duration to 10 seconds
        // Reset animation and redirect after completion
        setTimeout(() => {
            textboxRef.current.style.animation = ''; // Clear the animation to enable it to run again
            navigate('/Login'); // Change this to your desired URL
        }, 4000); // Match this timeout to the duration
    };

    // Handle key press event
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission
            startAnimation();
        }
    };

    // Handle search button click
    const handleSearchButtonClick = () => {
        startAnimation();
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-custom navbar-dark fixed-top">
                <a className="navbar-brand" href="#">Blog Boost</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact Us</a></li>
                    </ul>
                </div>
            </nav>

            {/* Jumbotron */}
            <div className="jumbotron text-center bg-primary text-white py-5 mt-5">
                <h1 className="display-4">Streamline your content effortlessly with Blog Boost</h1>
                <p className="lead">Revolutionize the way you create blogs using AI</p>
            </div>

            {/* New Search Box */}
            <div className="textbox" id="textbox" ref={textboxRef}>
                <div className="textbox-box">
                    <div className="textbox-field">
                        <div className="textbox-label">Article Title</div>
                        <input
                            className="textbox-text"
                            type="text"
                            placeholder="Type here..."
                            ref={searchInputRef}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className="textbox-action" onClick={handleSearchButtonClick}>
                        <svg viewBox="0 0 24 24">
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="content-container bg-light">
                <div className="container features">
                    <h2 className="display-4 text-center">Features</h2>
                    <p className="lead text-center">Discover the unique features of Blog Boost</p>
                    <div className="row">
                        <div className="col-md-4">
                            <h3>AI-Powered Content</h3>
                            <p>Generate high-quality blog content in seconds using advanced AI algorithms, tailored to your preferences.</p>
                        </div>
                        <div className="col-md-4">
                            <h3>SEO-Optimized Titles</h3>
                            <p>Enhance your content's discoverability with SEO-optimized blog titles and headings.</p>
                        </div>
                        <div className="col-md-4">
                            <h3>User-Friendly Interface</h3>
                            <p>Enjoy a simple and intuitive interface that makes content creation easy and accessible for everyone.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="content-container">
                <div className="container about">
                    <h2 className="display-4 text-center">About Us</h2>
                    <p className="lead text-center">Learn more about Blog Boost and our mission</p>
                    <div className="row">
                        <div className="col-md-8">
                            <p>Blog Boost is your go-to platform for generating blog content quickly and efficiently using AI-powered text generation. Whether you're a seasoned writer or just getting started, our tool streamlines your content creation process, so you can focus on what matters most—your ideas. We believe in the power of technology to simplify complex tasks and help individuals and businesses alike to scale their content production effortlessly.</p>
                        </div>
                        <div className="col-md-4">
                            <div className="image-space">Placeholder for image or interactive element</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="content-container bg-light">
                <div className="container">
                    <h2 className="display-4 text-center">Contact Us</h2>
                    <p className="lead text-center">Get in touch with our team</p>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Your name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Your email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea className="form-control" id="message" rows="5" placeholder="Your message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer bg-dark text-white text-center py-3">
                <div className="container">
                    <p>&copy; 2024 Blog Boost. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default TitlePage;

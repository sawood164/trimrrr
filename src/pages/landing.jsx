import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black">
      {/* Content */}
      <div className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center p-6 md:p-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Trimrrrr: The Ultimate URL Shortener
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl mb-10 font-light text-gray-300">
            Shorten, Manage, and Analyze Your URLs in One Click
          </p>
          {/* Form Section */}
          <form
            onSubmit={handleShorten}
            className="flex flex-col sm:flex-row w-full max-w-3xl gap-4 mb-12"
          >
            <Input
              type="url"
              value={longUrl}
              placeholder="Paste your long URL here"
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-1 py-4 px-6 rounded-lg border-none shadow-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              variant="default"
              className="h-full px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 rounded-lg shadow-lg transition-all duration-300"
            >
              Shorten URL
            </Button>
          </form>
          <img
            src="/bb.jpeg"
            alt="Trimrrr Banner"
            className="w-full max-w-4xl rounded-lg shadow-2xl"
          />
        </section>

        {/* Features Section */}
        <section className="w-full max-w-5xl px-8 mb-20 bg-black bg-opacity-70 p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl sm:text-5xl text-center font-semibold mb-12 text-white">
            Why Choose Trimrrrr?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Easy URL Shortening
              </h3>
              <p className="text-gray-400">
                Shorten your long URLs with a single click and make your links
                shareable anywhere.
              </p>
            </div>
            <div className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-blue-400 mb-4">
                Analytics & Tracking
              </h3>
              <p className="text-gray-400">
                Gain insights into your URL performance with detailed analytics
                on clicks, geolocation, and devices.
              </p>
            </div>
            <div className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                Customizable Links
              </h3>
              <p className="text-gray-400">
                Create branded URLs and improve your link visibility with custom
                short URLs.
              </p>
            </div>
            <div className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                User Management
              </h3>
              <p className="text-gray-400">
                Manage all your shortened URLs in one place with our easy-to-use
                dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="w-full max-w-4xl px-8 mb-16 bg-black bg-opacity-70 p-10 rounded-lg shadow-lg">
          <h2 className="text-4xl sm:text-5xl text-center font-semibold mb-10 text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="multiple" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold text-green-400">
                How does Trimrrrr URL Shortener work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                When you enter a long URL, Trimrrrr generates a shorter version
                that redirects to the original URL.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-bold text-blue-400">
                Do I need an account to use the service?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes. An account lets you manage your URLs, view analytics, and
                customize your links.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-bold text-purple-400">
                What analytics are provided for shortened URLs?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Track clicks, user geolocation, and device type for every
                shortened URL.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Footer Section */}
        <footer className="w-full px-6 py-10 bg-gray-900 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Trimrrrr. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;

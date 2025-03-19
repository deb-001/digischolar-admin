import { Accordion, Card } from "flowbite-react";
import { HiQuestionMarkCircle, HiMail, HiPhone } from "react-icons/hi"; // Import icons

export default function HelpCenter() {
  const faqs = [
    { question: "How do I reset my password?", answer: "Go to the settings page and click 'Reset Password'." },
    { question: "How can I contact support?", answer: "Email us at support@digischolar.ac.in or call +1234567890." },
    { question: "Why is my account restricted?", answer: "Please ensure you follow our community guidelines. Contact support for assistance." },
    { question: "What are the system requirements?", answer: "DigiScholar Admin Portal works best with modern browsers like Chrome, Firefox, Safari, and Edge. Ensure you have a stable internet connection for optimal performance." },
    { question: "Can I export data from the portal?", answer: "Yes, most tables within the portal have an export to CSV option. Look for the 'Export CSV' button within the table view." },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900"> {/* Set background color for the whole page */}
      <div className="max-w-3xl mx-auto"> {/* Center content and limit width */}
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">Help Center</h1>

        <Card
          className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <HiQuestionMarkCircle className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions (FAQs)</h2>
          </div>
          <Accordion collapseAll className="dark:text-gray-400">
            {faqs.map((faq, index) => (
              <Accordion.Panel key={index} className="mb-2 last:mb-0 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                <Accordion.Title className="font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600">
                  {faq.question}
                </Accordion.Title>
                <Accordion.Content className="p-5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 rounded-b-lg">
                  <p className="text-sm">{faq.answer}</p>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </Card>

        <Card
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <HiMail className="h-6 w-6 mr-2 text-green-500 dark:text-green-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Support</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <HiMail className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              Email us at <a href="mailto:support@digischolar.ac.in" className="text-blue-600 dark:text-blue-500 hover:underline">support@digischolar.ac.in</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <HiPhone className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              Call us at: <span className="font-semibold ml-1">+1234567890</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Our support team is available Monday to Friday, 9 AM to 5 PM PST.
            </p>
          </div>
        </Card>
      </div>
      
    </div>
  );
}
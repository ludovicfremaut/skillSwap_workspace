import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  createMessage,
  getConversation,
  getLatestMessagesForUser,
} from "@/services/message.service";

import type { IMessage } from "@/types/message";
import type { IUser } from "@/types/user";
import type { IConversation } from "@/types/conversation";
import { useAllUsers } from "@/hooks/useAllUsers";

export default function MessagePage() {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);
  const [activeUser, setActiveUser] = useState<IUser | null>(null);
  const { id } = useParams();

  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { users } = useAllUsers();

  const refreshConversations = useCallback(async () => {
    try {
      const response = await getLatestMessagesForUser(id!);
      if (Array.isArray(response)) {
        setConversations(response);
      } else {
        // If response is a single conversation
        setConversations([response as IConversation]);
      }
    } catch (error) {
      setError(error as Error);
    }
  }, [id]);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      await refreshConversations();
      setLoading(false);
    };
    fetchConversations();
  }, [refreshConversations]);

  const handleConversationClick = async (
    userId: string,
    contactId: number,
    user: IUser,
  ) => {
    setSelectedConversation(contactId);
    setActiveUser(user);
    try {
      const response = await getConversation(userId, contactId.toString());
      setMessages(Array.isArray(response) ? response : [response]);
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !id) return;

    try {
      const messageData = {
        sender_id: Number(id),
        receiver_id: selectedConversation,
        body: newMessage,
      };
      console.log("Sending message data:", messageData); // Log send data

      const newMsg = await createMessage(
        messageData,
        selectedConversation.toString(),
      );

      console.log("Received new message:", newMsg); // Log response
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");

      // Refresh conversations to show the latest message
      await refreshConversations();
    } catch (error) {
      console.error("Error sending message:", error); // Log error
      setError(error as Error);
    }
  };

  return (
    <>
      <Header />
      <section className="flex flex-col min-h-screen bg-secondary text-white">
        <div className="container mx-auto px-2 md:px-4 py-2 md:py-8 flex flex-col flex-grow">
          <h1 className="text-lg md:text-3xl font-bold mb-2 md:mb-6">
            {users.find((u) => u.id === Number(id))?.firstname ?? "Utilisateur"}
            , bienvenue sur votre messagerie
          </h1>

          {loading && <p>Chargement des conversations...</p>}
          {error && <p className="text-red-500">Erreur : {error.message}</p>}

          <div className="grid grid-rows-[1fr,2fr] md:grid-rows-1 md:grid-cols-3 gap-2 md:gap-6 flex-grow min-h-0">
            {/* List of conversations */}
            <Card className="bg-white h-[35vh] md:h-[calc(100vh-12rem)] overflow-y-auto scrollbar-custom">
              <div className="space-y-2 md:space-y-4 p-2 md:p-4">
                {conversations
                  .filter((conversation) => conversation)
                  .map((conversation) => {
                    const userId = Number(id);
                    const contactId =
                      conversation.sender_id === userId
                        ? conversation.receiver_id
                        : conversation.sender_id;
                    // Find the user corresponding to the conversation
                    const user = users.find((user) => user.id === contactId);

                    // If the user is not found, continue
                    if (!user) return null;

                    return (
                      <div
                        key={conversation.id}
                        onClick={() => {
                          handleConversationClick(id!, user.id, user);
                          setActiveUser(user);
                        }}
                        className={`p-2 md:p-4 rounded-lg cursor-pointer transition-colors bg-primary ${
                          selectedConversation === user.id
                            ? "opacity-80"
                            : "hover:opacity-90"
                        }`}
                      >
                        <div className="flex items-center space-x-2 md:space-x-4">
                          {user.profile_picture ? (
                            <img
                              src={user.profile_picture}
                              alt={`${user.firstname} ${user.lastname}`}
                              className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm md:text-xl font-bold text-gray-500">
                                {conversation.sender_id}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate text-sm md:text-base">
                              {user.firstname} {user.lastname}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 truncate max-w-full">
                              {conversation.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>

            {/* Conversation zone */}
            <Card className="bg-white md:col-span-2 p-2 md:p-4 h-[60vh] md:h-[calc(100vh-12rem)] flex flex-col min-h-0">
              {selectedConversation ? (
                <>
                  {/* Header of the conversation */}
                  {activeUser && (
                    <div className="border-b pb-2 md:pb-4 mb-2 md:mb-4 flex-shrink-0">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        {activeUser.profile_picture ? (
                          <img
                            src={activeUser.profile_picture}
                            alt={`${activeUser.firstname} ${activeUser.lastname}`}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm md:text-lg font-bold text-gray-500">
                              {activeUser.firstname.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                            {activeUser.firstname} {activeUser.lastname}
                          </h2>
                          <p className="text-xs md:text-sm text-gray-500">
                            {activeUser.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="text-black flex-1 overflow-y-auto space-y-2 md:space-y-4 mb-2 md:mb-4 scrollbar-custom min-h-0">
                    {messages.map((message) => {
                      const sender = users.find(
                        (user) => user.id === message.sender_id,
                      );
                      return (
                        <div key={message.id} className="flex justify-start">
                          {sender && sender.profile_picture ? (
                            <img
                              src={sender.profile_picture || ""}
                              alt={`${sender.firstname} ${sender.lastname}`}
                              className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover mr-2 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                              <span className="text-xs md:text-base font-bold text-gray-500">
                                {sender ? sender.firstname.charAt(0) : "?"}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-primary text-xs md:text-sm">
                                {sender ? sender.firstname : "Utilisateur"}
                              </span>
                            </div>
                            <div className="w-full p-2 md:p-3 rounded-lg mb-1 md:mb-2 bg-gray-100 text-black">
                              <p className="break-words text-sm md:text-base">
                                {message.body}
                              </p>
                              <span className="text-xs text-gray-500 mt-1 block">
                                {new Date(message.sending_date).toLocaleString(
                                  "fr-FR",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Input area */}
                  <div className="border-t pt-2 md:pt-4 flex-shrink-0">
                    <div className="flex space-x-2 md:space-x-4">
                      <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black text-sm md:text-base"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-primary text-secondary px-3 md:px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm md:text-base"
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">
                    Sélectionnez une conversation pour commencer à discuter
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

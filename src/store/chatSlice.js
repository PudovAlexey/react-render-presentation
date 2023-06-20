import { atom } from "jotai";
import { imgConfig } from "../ContextProvider";

export const chatSlice = {
  state: {
    messageIds: atom([]),
    messagesById: atom({}),
    sortedMessages: atom("asc"),
    inputValue: atom(""),
    search: atom(""),
    getMessageById: function (id) {
      return atom((get) => {
        const atomMessages = get(chatSlice.state.messagesById);

        return get(atomMessages[id]);
      });
    },
  },
  actions: {
    onInit: atom(null, (_, set, { messageIds, messagesDict }) => {
      console.log(messageIds, "messsageIds");
      const messagesDictAtoms = Object.keys(messagesDict).reduce((acc, id) => {
        acc[id] = atom(messagesDict[id]);
        return acc;
      }, {});

      set(chatSlice.state.messagesById, messagesDictAtoms);
      set(chatSlice.state.messageIds, messageIds);
    }),

    sendMessage: atom(null, (_, set) => {}),

    setInputValue: atom(null, (_, set, value) => {
      set(chatSlice.state.inputValue, value);
    }),

    onDeleteMessage: atom(null, (get, set, id) => {
      const messagesById = { ...get(chatSlice.state.messagesById) };
      const messageIds = get(chatSlice.state.messageIds);
      const excludeMessageId = messageIds.filter(
        (messageId) => messageId !== id
      );
      delete messagesById[id];

      set(chatSlice.state.messageIds, excludeMessageId);
      set(chatSlice.state.messagesById, messagesById);
    }),

    sendMessage: atom(null, (get, set) => {
      const inputValue = get(chatSlice.state.inputValue);
      const atomMessagesById = { ...get(chatSlice.state.messagesById) };
      const messagesIds = [...get(chatSlice.state.messageIds)];

      const newId = Math.max(...messagesIds) + 1;
      messagesIds.push(newId);

      atomMessagesById[newId] = atom({
        name: "Darth Vader",
        img: imgConfig["Darth Vader"],
        message: inputValue,
        isMessageEdit: false,
      });

      set(chatSlice.state.messageIds, messagesIds);
      set(chatSlice.state.messagesById, atomMessagesById);
      set(chatSlice.state.inputValue, "");
    }),

    onStartChangeUserMessage: atom(null, (get, set, id) => {
      const atomMessageDictById = get(chatSlice.state.messagesById);
      const message = { ...get(atomMessageDictById[id]), isMessageEdit: true };

      set(atomMessageDictById[id], message);
    }),

    changeMessage: atom(null, (get, set, { id, value }) => {
      const atomMessageDictById = get(chatSlice.state.messagesById);
      const message = { ...get(atomMessageDictById[id]), message: value };

      set(atomMessageDictById[id], message);
    }),

    onMessageSave: atom(null, (get, set, id) => {
      const atomMessageDictById = get(chatSlice.state.messagesById);
      const message = { ...get(atomMessageDictById[id]), isMessageEdit: false };

      set(atomMessageDictById[id], message);
    }),

    onSort: atom(null, (get, set) => {
      const sortDirection = get(chatSlice.state.sortedMessages);
      const newSortDirection = sortDirection === "asc" ? "desc" : "asc";

      set(chatSlice.state.sortedMessages, newSortDirection);
    }),

    setSearch: atom(null, (get, set, value) => {
      set(chatSlice.state.search, value);
    }),

    onNameSearch: atom(null, (get, set) => {
        const search = get(chatSlice.state.search);
        const messagesById = get(chatSlice.state.messagesById);
        Object.keys(messagesById).forEach((id) => {
          const message = { ...get(messagesById[id]) };
          let searchSubstring = message.name.replace(search, "");
  
          if (message.name.length === searchSubstring.length) {
            searchSubstring = "";
          }
  
          if (searchSubstring) {
            message.searchSubstring = searchSubstring;
            set(messagesById[id], message);
          }
        });
    }),

    onExit: atom(null, (_, set) => {
      set(chatSlice.state.messageIds, []);
      set(chatSlice.state.messagesById, {});
    }),
  },
};

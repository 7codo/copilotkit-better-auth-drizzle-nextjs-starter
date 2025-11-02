export interface AppendMessageOptions {
  /**
   * Whether to run the chat completion after appending the message. Defaults to `true`.
   */
  followUp?: boolean;
  /**
   * Whether to clear the suggestions after appending the message. Defaults to `true`.
   */
  clearSuggestions?: boolean;
}

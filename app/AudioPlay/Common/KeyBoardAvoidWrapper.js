// Library imports
import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

// Local imports
import { isIOS } from "./Constant";

export default KeyBoardAvoidWrapper = ({ children, containerStyle, contentContainerStyle }) => {
  return (
    <KeyboardAvoidingView style={[{ flex: 1 }, containerStyle]} behavior={isIOS ? "padding" : null}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

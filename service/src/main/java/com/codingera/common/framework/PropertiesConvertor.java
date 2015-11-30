package com.codingera.common.framework;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

public class PropertiesConvertor {

	public void convert(Properties props) {
		Enumeration<?> propertyNames = props.propertyNames();
		Set<String> unparsedKeys = new HashSet<String>();
		while (propertyNames.hasMoreElements()) {
			String propertyName = (String) propertyNames.nextElement();
			String propertyValue = props.getProperty(propertyName);
			convertProperty(props,unparsedKeys,propertyName,propertyValue);
		}
	}
	
	private void convertProperty(Properties props,Set<String> unparsedKeys,String propertyName,String propertyValue) {
		StringTokenParser parser = new StringTokenParser();
		parser.parse(propertyValue);
		if(!parser.getTokens().isEmpty()) {
			if(unparsedKeys.contains(propertyName)) {
				throw new RuntimeException("Cycle Depency found for key="+propertyName);
			}
			unparsedKeys.add(propertyName);
			for(StringTokenParser.StringToken t : parser.getTokens()) {
				String value = props.getProperty(t.token);
				if(value == null) {
					throw new NullPointerException("Property with key="+t.token+" not found.");
				}
				convertProperty(props,unparsedKeys,t.token,value);
				value = props.getProperty(t.token);
				if(value == null) {
					throw new NullPointerException("Property with key="+t.token+" not found.");
				}
				t.replaceWith(value);
			}
			props.setProperty(propertyName, parser.toString());
			unparsedKeys.remove(propertyName);
		}
	}


	
	
	static class StringTokenParser {
		private StringBuffer text;
		
		private String tokenPrefix = "${";
		private String tokenSuffix = "}";
		
		List<StringToken> tokens = new ArrayList<StringToken>();
		
		public void parse(String text) {
			this.text = new StringBuffer(text);
			int searchStart = 0;
			int tokenIndex = 0;
			for(int i = text.indexOf(tokenPrefix);i >= 0;i = text.indexOf(tokenPrefix,searchStart)) {
				int end = text.indexOf(tokenSuffix, i);
				if(end < 0) {
					break;
				}
				StringToken token = new StringToken();
				token.index = tokenIndex;
				token.startPosition = i;
				token.endPosition = end;
				token.token = text.substring(i+2,end);
				tokens.add(token);
				searchStart = end+1;
				tokenIndex++;
			}
		}

		public List<StringToken> getTokens() {
			return tokens;
		}
		
		private void adjustTokenPosition(int startIndex,int shift) {
			for(int i = startIndex+1;i < tokens.size();i++) {
				tokens.get(i).shift(shift);
			}
		}
		
		@Override
		public String toString() {
			return text.toString();
		}
		
		class StringToken {
			int index ;
			int startPosition;
			int endPosition;
			String token;
			
			public void replaceWith(String newText) {
				text.replace(startPosition, endPosition+1, newText);
				adjustTokenPosition(index,newText.length() - endPosition + startPosition - 1);
				
			}
			@Override
			public String toString() {
				return "("+startPosition+","+endPosition+")="+token;
			}
			
			private void shift(int shift) {
				startPosition += shift;
				endPosition += shift;
			}
		}
		
	}
}
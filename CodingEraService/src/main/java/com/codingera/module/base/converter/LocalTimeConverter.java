package com.codingera.module.base.converter;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.core.convert.converter.Converter;
 
public final class LocalTimeConverter implements Converter<String, Date> {
 
    private final SimpleDateFormat formatter;
    private final CustomDateEditor editor;
 
    public LocalTimeConverter(String dateFormat) {
        this.formatter = new SimpleDateFormat(dateFormat);
        this.editor = new CustomDateEditor(formatter, true){
        	@Override
        	public void setAsText(String text) throws IllegalArgumentException {
        		Date value = new Date(Long.valueOf(text));
        		setValue(value);
        	}
        };
    }
 
    @Override
    public Date convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }
        editor.setAsText(source);
        return (Date) editor.getValue();
    }
}
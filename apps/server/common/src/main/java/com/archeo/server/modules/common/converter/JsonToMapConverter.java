package com.archeo.server.modules.common.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.Map;

@Converter
public class JsonToMapConverter implements AttributeConverter<Map<String, String>, String> {


    private final ObjectMapper objectMapper=new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(Map<String, String> attribute) {
        try{
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Cannot convert map to json", e);
        }
    }

    @Override
    public Map<String, String> convertToEntityAttribute(String dbData) {

        if (dbData == null || dbData.trim().isEmpty()) {
            return Map.of();
        }
        try{
            return objectMapper.readValue(dbData, new TypeReference<>(){});
        }
        catch (IOException e) {
            throw new RuntimeException("Could not convert the JSON to map", e);
        }
    }
}

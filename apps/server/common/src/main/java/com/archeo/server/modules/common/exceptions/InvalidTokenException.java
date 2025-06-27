package com.archeo.server.modules.common.exceptions;

public class InvalidTokenException extends RuntimeException{

    public InvalidTokenException(String message){
        super(message);
    }
}

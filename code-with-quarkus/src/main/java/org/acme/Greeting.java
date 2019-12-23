package org.acme;

public class Greeting {

    String message;

    public Greeting() {
    }

    private Greeting(Builder builder) {
        setMessage(builder.message);
    }

    public static Builder newBuilder() {
        return new Builder();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static final class Builder {
        private String message;

        private Builder() {
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Greeting build() {
            return new Greeting(this);
        }
    }
}

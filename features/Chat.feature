Feature: Chat

  Scenario: send message
    Given Sean has said "hello"
    When Lucy looks at the messages
    Then Lucy should see "Sean: hello"

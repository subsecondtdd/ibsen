Feature: Chat

  Scenario: see old messages
    Given Sean has said "hello"
    When Lucy looks at the messages
    Then Lucy should see "Sean: hello"

  Scenario: send new messages
    When Sean says "hi"
    And Lucy looks at the messages
    Then Lucy should see "Sean: hi"

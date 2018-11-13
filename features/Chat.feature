Feature: Chat

  Scenario: send message
    Given Lucy has signed in
    And Sean has signed in
    When Sean says "Hello"
    Then Lucy should see message "Hello"

import {
  Body,
  Button,
  Container,
  Html,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
              repellat quae libero sint tenetur ipsam culpa voluptate temporibus
              totam nemo quo recusandae minus distinctio ducimus at eligendi,
              illo laborum. At.
            </Text>
            <Button
              href="https://example.com"
              className="bg-red-500 text-white px-3 py-2 rounded-md"
            >
              Click me
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

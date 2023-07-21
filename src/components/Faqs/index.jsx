import React from 'react'


import { Accordion } from 'flowbite-react';


const Faqs = () => {
    return (
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>
            How Many Players can join?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <p>
                For current version we have made a lobby for atmost 5 players
              </p>
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
              Can a user track his progress?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <p>
                Yes a user can track his/her progress by creating his/her account.
              </p>
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
                Can a player choose the time duration for the game ?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              <p>
                Yes the player can choose the time duration of the game according to the slots.
              </p>
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    )
  }

export default Faqs
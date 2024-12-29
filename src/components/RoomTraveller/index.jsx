import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Trash, Users } from "@phosphor-icons/react";

const RoomTraveller = ({ onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rooms, setRooms] = useState([
    {
      adults: 1,
      children: 0,
    },
  ]);

  const [summary, setSummary] = useState("1 visitors, 1 room");

  const updateRoom = (roomIndex, type, value) => {
    const newRooms = [...rooms];
    newRooms[roomIndex][type] = value;
    setRooms(newRooms);

    const totalTravellers = newRooms.reduce(
      (sum, room) => sum + room.adults + room.children,
      0
    );
    setSummary(
      `${totalTravellers} travellers, ${newRooms.length} room${
        newRooms.length > 1 ? "s" : ""
      }`
    );
  };

  const addRoom = () => {
    if (rooms.length < 8) {
      setRooms([...rooms, { adults: 1, children: 0 }]);
    }
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const newRooms = rooms.filter((_, i) => i !== index);
      setRooms(newRooms);
    }
  };

  const handleDone = () => {
    onSelect(summary);
    onClose();
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        variant={"bordered"}
        startContent={<Users size={20} weight="bold" />}
        size="lg"
        className="w-80 justify-start pl-4 text-left"
      >
        {summary}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent className="text-black">
          <ModalHeader className="flex flex-col gap-1 ">
            Select Rooms and Visitors
          </ModalHeader>
          <ModalBody>
            {rooms.map((room, roomIndex) => (
              <div
                key={roomIndex}
                className="border-2 border-gray-300 rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium">Room {roomIndex + 1}</div>
                  <div>
                    {rooms.length > 1 && (
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        onPress={() => removeRoom(roomIndex)}
                      >
                        <Trash size={20} color="red" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Adults</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        isIconOnly
                        variant="bordered"
                        size="sm"
                        isDisabled={room.adults <= 1}
                        onPress={() =>
                          updateRoom(
                            roomIndex,
                            "adults",
                            Math.max(1, room.adults - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="w-4 text-center">{room.adults}</span>
                      <Button
                        isIconOnly
                        variant="bordered"
                        size="sm"
                        isDisabled={room.adults >= 4}
                        onPress={() =>
                          updateRoom(
                            roomIndex,
                            "adults",
                            Math.min(4, room.adults + 1)
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-gray-500">Ages 0 to 17</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        isIconOnly
                        variant="bordered"
                        size="sm"
                        isDisabled={room.children <= 0}
                        onPress={() =>
                          updateRoom(
                            roomIndex,
                            "children",
                            Math.max(0, room.children - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="w-4 text-center">{room.children}</span>
                      <Button
                        isIconOnly
                        variant="bordered"
                        size="sm"
                        isDisabled={room.children >= 4}
                        onPress={() =>
                          updateRoom(
                            roomIndex,
                            "children",
                            Math.min(4, room.children + 1)
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {rooms.length < 8 && (
              <div className="flex justify-center">
                <Button
                  onPress={addRoom}
                  className="w-64 justify-center bg-gradient-to-r from-sky-500 to-sky-700 text-white"
                >
                  Add another room
                </Button>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleDone} className="bg-gradient-to-r from-sky-500 to-sky-700">
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );w
};

export default RoomTraveller;

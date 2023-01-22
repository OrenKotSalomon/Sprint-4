import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { Fragment, useEffect, useRef, useState } from "react";
import { ADD_GROUP_FROM_BUTTOM, boardService, DATE_PICKER, MEMEBER_PICKER, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_STATUS } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoard, loadBoards, updateBoard, updateGroup, updateTask } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Icon } from 'monday-ui-react-core';
import { Add } from 'monday-ui-react-core/icons';
import { DynamicModal } from "../cmps/dynamic-modal";

export function BoardDetails() {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cmp, setCmp] = useState({})

    const boardContainer = useRef()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function onUpdateTaskLabel(type, data, labelPick) {
        console.log('TYPE', type);
        console.log(labelPick);
        data.labelPick = labelPick
        console.log(data);
        switch (type) {
            case UPDATE_TASK_STATUS:
                console.log('in status picker');
                return updateTask(board, data, UPDATE_TASK_STATUS)
            case UPDATE_TASK_DATE:
                console.log('in date picker');
                return updateTask(board, data, UPDATE_TASK_DATE)
        }

    }

    function openModal(ev, data, info) {
        let labelPos = ev.target.getBoundingClientRect()
        // let bbb = boardContainer.current.getBoundingClientRect()
        // console.log(labelPos);
        // console.log(bbb.top);
        // console.log(document.body.scrollLeft);
        console.log(info);
        setIsModalOpen(true)

        // statuses memebers should go on board obj ?
        switch (info) {
            case STATUS_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        pos: { top: labelPos.top, left: labelPos.left },
                        type: info,
                        statuses: [
                            {
                                label: 'done',
                                bgColor: '#00c875'
                            },
                            {
                                label: 'working on it',
                                bgColor: '#fdab3d'
                            },
                            {
                                label: 'stuck',
                                bgColor: '#e2445c'
                            },
                            {
                                label: '',
                                bgColor: '#c4c4c4'
                            },
                        ]
                    }
                })
            case MEMEBER_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        type: info,
                        pos: { top: labelPos.top, left: labelPos.left },
                        info: {
                            selectedMembers: ['m1', 'm2'],
                            members: data.task.members
                        }
                    }
                })
            case DATE_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        type: info,
                        pos: { top: labelPos.top, left: labelPos.left },
                        info: {
                            selectedDate: data.task.dueDate
                        }
                    }
                })

        }
    }

    if (!board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div className="board-container">
            <BoardHeader
                board={board}
            />
            <section ref={boardContainer} className="groups-container">
                {board.groups.map(group => <GroupList key={group.id} board={board} group={group} openModal={openModal} />)}
                <button className="btn clean buttom-add-group-btn"
                    onClick={() => updateGroup(board, null, ADD_GROUP_FROM_BUTTOM)}>
                    <Icon iconType={Icon.type.SVG} icon={Add} iconSize={19} /> Add  new group
                </button>
            </section>
            {isModalOpen && <DynamicModal cmp={cmp} setIsModalOpen={setIsModalOpen} onUpdateTaskLabel={onUpdateTaskLabel} />}
            <div className="add-group-btn-container">
            </div>
        </div>
        }

    </section >
}
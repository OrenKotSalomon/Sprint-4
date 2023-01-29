
import { utilService } from '../services/util.service.js';

import { Icon } from 'monday-ui-react-core'
import { Time, Team, Status, DropdownChevronRight } from 'monday-ui-react-core/icons'



export function TaskActivity({ task }) {

    function lableStrToUpperCase(str) {
        console.log(str)
        switch (str) {
            case 'done':
                return 'Done'
            case 'working on it':
                return 'Working on it'
            case 'stuck':
                return 'Stuck'
            case 'default':
                return 'Default'
            case 'label 1':
                return 'Label 1'
            case 'label 2':
                return 'Label 2'
            case 'label 3':
                return 'Label 3'
            case 'low':
                return 'Low'
            case 'medium':
                return 'Medium'
            case 'high':
                return 'High'
            case 'critical ⚠️':
                return 'Critical ⚠️'
        }
    }


    function taskActivityTypePicker(type, activ) {
        switch (type) {
            case 'update_member':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Team} iconLabel="my svg icon" iconSize={14} />
                    Person
                </div>
                    <div className="activity-action">
                        {activ.action}
                    </div>
                    <div className="activity-data">
                        {activ.toUserImg ? <img className='activity-by-avatar' src={activ.toUserImg} alt="" />
                            : <div className='task-details-by-user-img activity-by-avatar' >{(activ.toUserName).charAt(0).toUpperCase()}</div>}
                    </div>
                </section>
            case 'update_status':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} />
                    Status
                </div>
                    <div className={'activity-status' + ` ${activ.fromStatus}`}>
                        {lableStrToUpperCase(activ.fromStatus)}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toStatus}`}>
                        {lableStrToUpperCase(activ.toStatus)}
                    </div>
                </section>
            case 'update_priority':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} />
                    Priority
                </div>
                    <div className={'activity-status' + ` ${activ.fromPriority}`}>
                        {lableStrToUpperCase(activ.fromPriority)}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toPriority}`}>
                        {lableStrToUpperCase(activ.toPriority)}
                    </div>
                </section>
            case 'update_label':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} />
                    Label
                </div>
                    <div className={'activity-status' + ` ${activ.fromLabel}`}>
                        {lableStrToUpperCase(activ.fromLabel)}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toLabel}`}>
                        {lableStrToUpperCase(activ.toLabel)}
                    </div>
                </section>
        }
    }

    return <section>
        {(task.activity && task.activity.length) ?
            task.activity.map(activ => <div key={activ.id} className="activity-row">

                <div className="activity-by">
                    <span className="activity-by-time">
                        <Icon className='task-details-header-time-icon'
                            iconType={Icon.type.SVG} icon={Time} iconLabel="my svg icon" iconSize={14} />
                        {utilService.time_ago(activ.time)}
                    </span>
                    <img className='activity-by-avatar' src={activ.byUser?.imgUrl ? activ.byUser.imgUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqOplc5fcAaHwZ-1SD2Az_1Fp9-x1QDCt6-w&usqp=CAU'} alt="" />
                    <span className="activity-by-task">{task.title}</span>
                </div>

                {taskActivityTypePicker(activ.type, activ)}

            </div>) : 'NO ACTIVITY FOR THIS TASK YET...'
        }

    </section >
}




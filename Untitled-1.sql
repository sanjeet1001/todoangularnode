select * from users

create table todousers(Id UNIQUEIDENTIFIER, TaskName nvarchar(255), TaskAssign nvarchar(255), LastDate date, TaskStatus nvarchar(255));

insert into todousers values(NEWID(), 'Dads Birthday' , 'Karan Abc', GETDATE(),'Incomplite')

select * from todousers

update todousers set taskstatus = 'Incomplete'
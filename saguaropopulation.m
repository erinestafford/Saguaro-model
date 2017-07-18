A = xlsread('clasesofsaguaro.xlsx');
S = zeros(17,2);
SA= zeros(17,1);


for i=1:17
    for k=1:2352
        m=A(k,i);
        if m<=2 & m>0
            S(i,1)=S(i,1)+1;
        elseif m>2
            S(i,2)=S(i,2)+1;
        else
            S=S;
        end
        k=k+1;
    end
    i=i+1;
end

for n=1:17
    for l=1:2352
        p=A(l,n);
        if p>0
            SA(n,1)=SA(n,1)+1;
        else
            SA=SA;
        end
    end 
    
    n=n+1;
end
c = categorical({'1942','1960','1968','1979','1980','1987','1988','1993','1998','2000','2003','2007','2008','2010','2013','2015','2016'});
str={'*NOTE: There is a discrepancy in the data entered in 2013*'};
dim=[.4 .04 .0065 .003];
figure(1)
hold on;
b=bar(c,S,1);
b(1).FaceColor='cyan';
b(2).FaceColor='blue';
set(gca,'FontSize',12);
legend({'Juvenile','Adult'},'Position',[.75 .7 0.1 0.2],'FontSize',12);
xlabel('Years','Fontsize',12);
ylabel('Population','Fontsize',12);
title('Juvenile and Adult Saguaro Population','FontSize',12)
%a = annotation('textbox',dim,'String',str,'FitBoxToText','on');
%a.FontSize = 12;
text(5, -175,str,'outside', 'clipping', 'off');
hold off

% figure(2)
% g=bar(c,SA);
% title('Total Population')


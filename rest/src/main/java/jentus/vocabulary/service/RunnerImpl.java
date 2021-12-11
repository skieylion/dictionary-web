package jentus.vocabulary.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RunnerImpl implements Runner {

    //private final FormRepository formRepository;
//    private final ContextRepository contextRepository;
//    private final RepeaterRepository repeaterRepository;

    @Override
    public void run() {

        //List<Repeater> repeaterList=new ArrayList<>();
        //repeaterRepository.findAll().forEach(repeaterList::add);
        //Repeater repeater=repeaterList.get(0);
//        Context context=contextRepository.findById(39L).get();
//        Repeater repeater=new Repeater();
//        repeater.setContext(context);
//        repeater.setTs(new Date());
//        //repeater.setId(9);
//        repeaterRepository.save(repeater);

        //System.out.println(context.getDef());

//        FileTable fileTable=new FileTable();
//        fileTable.setUid("bf586d3a-8d73-4392-ab8a-44e67efd22b3");
//        fileTable.setName("hhdfd");
//        byte[] data=new byte[1];
//        data[0]=0x6;
//        fileTable.setData(data);
//        fileTableRepository.save(fileTable);
    }
}
